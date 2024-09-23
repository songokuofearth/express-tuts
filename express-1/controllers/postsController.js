let arr = [
    { id: 1, name: 'karan' },
    { id: 3, name: 'karan3' },
    { id: 2, name: 'karan2' },
];

const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        res.json(arr.slice(0, limit));
    } else {
        res.json(arr);
    }
};

const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);

    const result = arr.find(item => item.id === id);  // Use find to get a single object

    if (result) {
        res.json(result);  // Return the object directly
    } else {
        const error = new Error('404 not found id');
        return next(error);
    }
};

const createPost = (req, res) => {
    const post = {
        id: arr.length + 1,
        name: req.body.name,  // Changed to `name` to be consistent with the existing structure
    };

    if (!post.name) {
        return res.status(400).json({ message: 'Please enter a name' });
    }
    arr.push(post);
    res.status(201).json(arr);
};

const updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const index = arr.findIndex(item => item.id === id);

    if (index === -1) {
        res.status(404).json({ message: 'Enter correct id' });
    } else {
        arr[index].name = req.body.name;
        res.status(200).json(arr);
    }
};

const deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const index = arr.findIndex(item => item.id === id);

    if (index === -1) {
        res.status(404).json({ message: 'Enter correct id' });
    } else {
        arr.splice(index, 1);
        res.status(200).json(arr);  // Use 200 for successful deletion
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};
