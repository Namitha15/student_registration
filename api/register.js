export default function handler(req, res) {
    if (req.method === 'POST') {
        const { fullname, email, age, phone, course, password } = req.body;
        console.log('New Registration:', { fullname, email, age, phone, course, timestamp: new Date() });
        res.status(200).send('Success');
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
