import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    
    const totalPosts = await Post.find();
    return NextResponse.json({ totalPosts }, { status: 200 });
};

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");

    await connectMongoDB();
    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
};