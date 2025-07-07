export function deletePost(req, res) {
    const { slug } = req.params;
    const { db } = req.server;

    const deleteStatement = db.prepare("DELETE FROM posts WHERE slug = ?");
    deleteStatement.run(slug);

    return res.redirect("/");
}
