const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "changed api messaged" });
});

// get single user from database
app.get("/api/users/:id", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", req.params.id).single();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
  
});

// get user profile from database
app.get("/api/profile/:id", async (req, res) => {
  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", req.params.id).single();
  if (error) {
    res.status(500).json({ error: error.message });
  }
  else{
    res.status(200).json(data);
  }
});

// get user and their profile from database by using join
app.get("/api/user-profile/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*, user_profiles(*)")
    .eq("id", req.params.id)
    .single();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

// delete user from supabase
app.delete("/api/:id", async (req, res) => {
  const {data , error} = await supabase.from("users").delete().eq("id", req.params.id).single();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

// delete user profile from supabase
app.delete("/api/profile/:id", async (req, res) => {
  const {data , error} = await supabase.from("user_profiles").delete().eq("id", req.params.id).single();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

// get all users data from supabase
app.get("/api/users", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});


// create a new user and user profile
app.post("/api/user-profile/new", async (req, res) => {
  try {
    const { first_name, last_name, email, hobby, bio, date_of_birth } = req.body;

    // Check if email exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create user
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([{ first_name, last_name, email, hobby }])
      .select()
      .single();

    if (userError) {
      return res.status(500).json({ error: userError.message });
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert([{ id: userData.id, bio, date_of_birth }]);

    if (profileError) {
      // Rollback user creation
      await supabase.from("users").delete().eq("id", userData.id);
      return res.status(500).json({ error: profileError.message });
    }

    return res.status(201).json({ 
      message: "Profile created successfully",
      user: userData 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// resgiter user
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    res.json({ message: "Registration successful!", user: data.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// login user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    res.json({ token: data.session.access_token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




module.exports = app;
