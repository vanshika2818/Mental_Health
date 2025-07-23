import axios from 'axios';

export const detectEmotion = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const predictions = response.data[0];
    const topEmotion = predictions.reduce((max, curr) =>
      curr.score > max.score ? curr : max
    );

    res.json({ emotion: topEmotion }); // 👈 label + score dono bhej raha hai
  } catch (error) {
    console.error('Emotion detection error:', error.message);
    res.status(500).json({ error: 'Failed to detect emotion' });
  }
};
