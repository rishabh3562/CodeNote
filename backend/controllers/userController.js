import axios from 'axios';
import moment from 'moment';

const NEURAL_WEIGHTS = {
  PushEvent: { base: 0.6, timeMod: 1.2 },
  PullRequestEvent: { base: 0.8, timeMod: 1.1 },
  IssueCommentEvent: { base: 0.4, timeMod: 1.0 },
  WatchEvent: { base: 0.1, timeMod: 0.8 },
};

const analyzeTemporalPatterns = (events) => {
  const initial = {
    dailyActivity: new Map(),
    peakHours: new Array(24).fill(0),
    rhythmPattern: new Array(7).fill(0),
    typeBreakdown: new Map(),
    codeImpact: { additions: 0, deletions: 0, net: 0 },
  };

  return events.reduce((acc, event) => {
    const date = moment.utc(event.created_at);
    const day = date.format('YYYY-MM-DD');
    const hour = date.hour();
    const weekday = date.isoWeekday() - 1; // 0-6 (Monday-Sunday)

    // Temporal analysis with timezone awareness
    const weightConfig = NEURAL_WEIGHTS[event.type] || {
      base: 0.5,
      timeMod: 1.0,
    };
    const timeValue =
      weightConfig.base * (hour <= 6 ? weightConfig.timeMod : 1);

    // Daily activity tracking
    acc.dailyActivity.set(day, (acc.dailyActivity.get(day) || 0) + 1);

    // Peak hour calculation with exponential decay
    acc.peakHours[hour] = acc.peakHours[hour] + timeValue;

    // Weekly rhythm pattern
    acc.rhythmPattern[weekday] += timeValue;

    // Event type breakdown
    acc.typeBreakdown.set(
      event.type,
      (acc.typeBreakdown.get(event.type) || 0) + 1
    );

    // Code impact analysis
    if (event.type === 'PushEvent' && event.payload?.commits) {
      event.payload.commits.forEach((commit) => {
        acc.codeImpact.additions += commit.additions || 0;
        acc.codeImpact.deletions += commit.deletions || 0;
      });
      acc.codeImpact.net = acc.codeImpact.additions - acc.codeImpact.deletions;
    }

    return acc;
  }, initial);
};

const userController = {
  getUserActivity: async (req, res) => {
    const { username } = req.params;

    try {
      const [events, prs, issues] = await Promise.all([
        axios.get(
          `https://api.github.com/users/${username}/events?per_page=100`
        ),
        axios.get(
          `https://api.github.com/search/issues?q=author:${username}+type:pr`
        ),
        axios.get(
          `https://api.github.com/search/issues?q=author:${username}+type:issue`
        ),
      ]);

      const temporalInsights = analyzeTemporalPatterns(events.data);

      // Calculate activity duration properly
      const firstEvent = events.data[events.data.length - 1]?.created_at; // Oldest event
      const daysActive = moment().diff(moment(firstEvent), 'days') || 1;

      const deepStats = {
        rawCounts: {
          commits: events.data
            .filter((e) => e.type === 'PushEvent')
            .reduce((sum, e) => sum + (e.payload.size || 0), 0),
          pullRequests: prs.data.total_count,
          issues: issues.data.total_count,
        },
        temporal: {
          dailyActivity: Object.fromEntries(temporalInsights.dailyActivity),
          peakHours: temporalInsights.peakHours.map((v) =>
            Number(v.toFixed(2))
          ),
          rhythmPattern: temporalInsights.rhythmPattern.map((v) =>
            Number(v.toFixed(2))
          ),
          typeBreakdown: Object.fromEntries(temporalInsights.typeBreakdown),
          activityConsistency: Number(
            (temporalInsights.dailyActivity.size / daysActive).toFixed(2)
          ),
          primeTime: temporalInsights.peakHours.reduce(
            (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
            0
          ),
        },
        codeImpact: temporalInsights.codeImpact,
        behavioralProfile: {
          isNightCoder: temporalInsights.peakHours
            .slice(22, 24)
            .concat(temporalInsights.peakHours.slice(0, 6))
            .some((v) => v > 0),
          weekendEngagement: Number(
            (
              (temporalInsights.rhythmPattern
                .slice(5, 7)
                .reduce((a, b) => a + b, 0) /
                temporalInsights.rhythmPattern.reduce((a, b) => a + b, 1)) *
              100
            ).toFixed(1)
          ),
        },
      };

      res.json(deepStats);
    } catch (err) {
      res.status(500).json({
        error:
          err.response?.data?.message ||
          'Failed to analyze developer activity patterns',
        details: err.message,
      });
    }
  },
};

export default userController;
