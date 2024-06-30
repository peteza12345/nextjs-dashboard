import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectMongoDB();
    const totalUsers = await User.find();
    return NextResponse.json({ totalUsers }, { status: 200 });
};

export async function DELETE(req, res) {
    const id = req.nextUrl.searchParams.get("id");

    await connectMongoDB();
    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
};