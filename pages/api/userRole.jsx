const users = [
    {
        role: 'guest',
        id: 1
    },
    {
        role: 'barista',
        id: 2
    },
    {
        role: 'admin',
        id: 3
    },
    {
        role: 'user',
        id: 4
    }
]
export default function handler(req, res) {
    res.status(200).json(users[3].role)
}