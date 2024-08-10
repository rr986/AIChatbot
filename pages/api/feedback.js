export default async function handler(req, res) {
  const { feedback } = req.body;

  console.log('Received feedback:', feedback);

  res.status(200).json({ message: 'Feedback received' });
}
