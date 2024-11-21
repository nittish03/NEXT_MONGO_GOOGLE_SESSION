import { prismaDB } from "@/lib/prismaDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/authOption";

export async function GET(request: Request) {
    const session = await getServerSession(AuthOptions);
    try{
        const userCard  = await prismaDB.user.findUnique({
            where:{
                email: session?.user?.email!,
            }})
            if(userCard){
                return NextResponse.json({
                    Username:userCard.name,
                    University:userCard.University,
                    Degree:userCard.Degree,
                    Branch:userCard.Branch
                })
            }
    }catch(err){
        console.log(err);
    }
}


export async function POST(request: Request) {
    const session = await getServerSession(AuthOptions);
    const body = await request.json();
    const { username,university,degree,branch } = body;

    if(!university || !degree || !branch){
        return NextResponse.json({
            message: "Missing value university, degree or branch",
            success: false,
        })
    }
        try {
                const userCard  = await prismaDB.user.update({
                    where:{
                        email: session?.user?.email!,
                    },
                    data:{
                        name:username,
                        University:university,
                        Degree:degree,
                        Branch:branch
                    }
                })
                return NextResponse.json({
                    message: "Sucess",
                    success: true,
                })
            



} catch (error) {
            console.log(error)
}
}