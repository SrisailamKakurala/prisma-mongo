const prisma = require('../prisma/index');

const createPost = async (req, res) => {
    try {
        const { title, body, authorId } = req.body;

        if (!title || !body || !authorId) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all the fields'
            })
        }

        const slug = title.trim().replace(/\s+/g, '-').toLowerCase();

        const post = await prisma.post.create({
            data: {
                slug,
                title,
                body,
                author: {
                    connect: {
                      id: authorId
                    }
                }
            }
        })

        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = createPost;