import { Buffer } from 'node:buffer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const body = Buffer.concat(buffers).toString();
        const params = new URLSearchParams(body);

        const data = {
            fullname: params.get('fullname') || 'N/A',
            email: params.get('email') || 'N/A',
            age: params.get('age') || 'N/A',
            phone: params.get('phone') || 'N/A',
            course: params.get('course') || 'N/A',
            password: params.get('password') || 'hidden',
            timestamp: new Date().toISOString()
        };

        console.log('New Registration:', data);

        res.status(200).send('Success');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error');
    }
}

export const config = {
    api: {
        bodyParser: false   // ← THIS LINE WAS MISSING BEFORE!
    }
};
