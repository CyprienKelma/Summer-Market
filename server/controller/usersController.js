//@desc Get all users
//@route GET /api/users
//@access Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

//@desc Get user by id
//@route GET /api/users/:id
//@access Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//@desc Create a user
//@route POST /api/users
//@access Public
const createUser = asyncHandler(async (req, res) => {
    res.status(201).json({ 
        message: "Create an user" 
    });
});

module.exports = { getUsers, getUserById, createUser };