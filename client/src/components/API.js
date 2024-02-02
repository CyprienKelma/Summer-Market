// API.js
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

export const generateProductDescription = async (productName) => {
  try {
    if (!productName) {
      return ''; // Si le nom du produit est vide, retourne une chaîne vide
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        //Ci-dessous c'est le message à chatgpt pour qu'il génère un message
        {"role": "user", "content": `Générer une description qui donne envie pour le produit "${productName}". S'il te plait sois le plus concis possible.`},
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API OpenAI:', error);
    throw error;
  }
};