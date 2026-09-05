// Components
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <p>Main Page</p>
            <Link href="/sign-up">Sign Up</Link>
            <Link href="/sign-in">Sign In</Link>
        </main>
    );
}
