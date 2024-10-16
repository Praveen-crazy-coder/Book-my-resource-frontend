import React from "react";
import homeBackground from "../images/logo.png"; // Your background image

const HomePage = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundImage: `url(${homeBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff"
            }}
        >
            {/* Header */}
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem 2rem",
                    backgroundColor: "rgba(0, 0, 0, 0.7)"
                }}
            >
                <h1 style={{ margin: 0 }}>Resource Scheduler</h1>
            </header>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "2rem",
                    backgroundColor: "rgba(0, 0, 0, 0.7)"
                }}
            >
                <h2>Welcome to Resource Scheduler!</h2>
                <p style={{ fontSize: "1.2rem", maxWidth: "600px", lineHeight: "1.6" }}>
                    Our platform helps you efficiently schedule and manage resources such as meeting rooms, projectors, and other office equipment. Streamline your booking process and avoid double bookings by checking the availability in real-time. Whether you need a space for a meeting or technical equipment for a presentation, our app makes it simple and easy to reserve everything you need with just a few clicks.
                </p>
            </main>

            {/* Footer */}
            <footer
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "#fff",
                    textAlign: "center",
                    padding: "1rem"
                }}
            >
                <p>&copy; 2024 Resource Scheduler. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
