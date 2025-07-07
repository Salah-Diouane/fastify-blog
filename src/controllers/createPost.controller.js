import slugify from "slugify";
import Ajv from "ajv";

const ajv = new Ajv();


const postSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            minLength: 1,
            maxLength: 100,
            pattern: "^(?=.*[a-zA-Z]).+$",
        },
        content: {type: "string", minLength: 1},
    },
    required: ["title", "content"],
    additionalProperties: false,
};

const validatePost = ajv.compile(postSchema);



export function getNewPost(req, res){
    return res.view("new", { title: "Create New Post"});
}



export function createPost (req, res){
    const {title, content} = req.body;

    const validData = validatePost({title, content});
    if (!validData){
        return res.status(400).send({
            error: "Invalid Input",
            details: validatePost.errors,
        });
    }

    const slug = slugify(title, { lower: true, strict: true});
    const db = req.server.db;

    const insertStatement = db.prepare("INSERT INTO posts (title, slug, content) VALUES (?, ?, ?)");
    insertStatement.run(title, slug, content);

    return res.redirect("/");
}