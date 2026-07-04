import "./globals.css";
export const metadata = {
    title: "Contest Reminder",
    description: "Never miss a coding contest again.",
};
export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark">
            <body>{children}</body>
        </html>
    );
}
