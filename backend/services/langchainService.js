const {ChatOpenAI } =require('@langchain/openai')



const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo-instruct",
  });
  const fetch= async () => {
      try {
      const response = await model.invoke("how are you?");
    console.log(response);  
    }catch (error) {
          console.error(error);
      }

  }
fetch();
const generateMarkdownFromContext = async (context) => {
    // Convert context to a prompt
    const prompt = `
  Generate detailed documentation from the following code context:
  ${JSON.stringify(context)}
  `;

    const response = await langChain.complete({
        prompt: prompt,
        maxTokens: 1500,
    });

    return response.choices[0].text;
};

module.exports = { generateMarkdownFromContext };
