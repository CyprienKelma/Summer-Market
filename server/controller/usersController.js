const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);


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
    try {
        const { name, email, password } = req.body;
        const userId = await createUser(name, email, password);
        res.status(201).json({ message: "User created", userId });
      } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

//@desc Update a user
//@route PUT /api/users/:id
//@access Public
const updateUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if(user){
        user.name = name;
        user.email = email;
        user.password = password;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//@desc Delete a user
//@route DELETE /api/users/:id
//@access Public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        await user.remove();
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser};