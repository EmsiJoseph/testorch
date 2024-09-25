import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

// Path to the seeders directory
const seedersPath = path.join(__dirname, "./");

// Dynamically import and run all seed files
async function runAllSeeders() {
    const files = fs.readdirSync(seedersPath);

    for (const file of files) {
        // Check if the file ends with .seeder.ts
        if (file.endsWith(".seeder.ts")) {
            const filePath = path.join(seedersPath, file);
            const fileUrl = pathToFileURL(filePath);  // Convert to file URL

            try {
                const seeder = await import(fileUrl.href);  // Import using file URL

                // Assuming each seeder exports a default function to execute the seeding
                if (typeof seeder.default === "function") {
                    console.log(`Running seeder: ${file}`);
                    await seeder.default();
                }
            } catch (err) {
                console.error(`Failed to run seeder: ${file}`, err);
            }
        }
    }

    console.log("All seeders have been run.");
}

runAllSeeders().catch((err) => {
    console.error("Error running seeders:", err);
});
