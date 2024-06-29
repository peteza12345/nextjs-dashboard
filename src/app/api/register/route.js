import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Please provide all required fields." }, { status: 400 });
        }

        await connectMongoDB();

        // Check if the email already exists
        const existingUser = await User.findOne({ email }).select("_id");
        if (existingUser) {
            return NextResponse.json({ message: "Email is already registered." }, { status: 400 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}