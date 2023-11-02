const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

// MongoDB connection URL
const mongoUrl =
  "mongodb+srv://admin:7NmkMXnT0JXzHsV2@cluster0.mkmgp.mongodb.net/property";
const targetCollectionName = "propertyData";
// Define the Mongoose schema for the propertyData model
const propertyDataSchema = new mongoose.Schema(
  {
    // Define your schema fields here, matching the model definition
    id: String,
    name: String,
    propertyDescription: String,
    developerName: String,
    propertyType: String,
    noOfUnit: String,
    location: String,
    tenure: String,
    latitude: Number,
    longitude: Number,
    developmentDescription: String,
    topDate: String,
    main_image: String,
    slug: String,
    leaseType: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    unitMix: [],
    nearbyAmenities: [],
    facilities: [],
  },
  { collection: targetCollectionName },
);
// MongoDB source collection name (from where you want to read data)

const sourceCollectionName = "raw_data";

const dbName = "property";
// Function to seed data
async function seedData() {
  // Create a MongoDB client
  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

  try {
    // Connect to MongoDB
    await mongoose
      .connect(mongoUrl)
      .then(() => {
        console.log("connection established!");
      })
      .catch((err) => {
        console.log(err);
      });

    const sourceCollection = client.db(dbName).collection(sourceCollectionName);
    const targetCollection = client.db(dbName).collection(targetCollectionName);
    const PropertyData = mongoose.model(targetCollection, propertyDataSchema);
    // Access the source and target collections

    // Read data from the source collection
    const dataToSeed = await sourceCollection.find().toArray();

    console.log(`Successfully pulled data, extracting to view`);

    var presentData = dataToSeed.filter((e) => e.property_data !== null);
    console.log(`Cleaned data. There is ${presentData.length} to process`);

    const pattern = /(\d+)\s*Year/i;

    for (const item of presentData) {
      console.log(`Adding ${item.property_data[0].Name}`);
      const newData = new PropertyData({
        name: item.property_data[0].Name,
        propertyDescription: item.property_data[0].Description,
        developerName: item.property_data[0].Developer,
        noOfUnit: item.property_data[0].NumberOfUnits,
        location: item.property_data[0].Location,
        tenure: item.property_data[0].Tenure.toLowerCase().includes(
          "freehold" || "estate in fee simple",
        )
          ? "Freehold"
          : item.property_data[0].Tenure.toLowerCase().match(pattern)
          ? `${
              item.property_data[0].Tenure.toLowerCase().match(pattern)[1]
            } Year`
          : "Not available",
        main_image: item.property_data[0].MainDisplayImageUrl,
        latitude: !isNaN(item.property_data[0].Latitude)
          ? item.property_data[0].Latitude
          : parseFloat(item.property_data[0].Latitude.replace(",", "")),
        longitude: !isNaN(item.property_data[0].Longitude)
          ? item.property_data[0].Longitude
          : parseFloat(item.property_data[0].Longitude.replace(",", "")),
        developmentDescription: item.property_data[0].KeyPoints,
        topDate:
          item.property_data[0].ReadyDateDisplay === null
            ? "Not available"
            : item.property_data[0].ReadyDateDisplay,
        slug: item.property_data[0].Path,
      });

      // Check if a document with the same slug exists
      const existingData = await PropertyData.findOne({ slug: newData.slug });

      if (existingData) {
        // Handle the duplicate slug (e.g., update the existing document)
        existingData.name = newData.name;
        existingData.propertyDescription = newData.propertyDescription;
        // ... (update other fields)

        // Save the updated document
        await existingData.save().then(() => {
          console.log(`Data successfully saved!`);
        });
      } else {
        // Insert the new document if no duplicate slug exists
        await newData.save();
      }
    }

    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Run the seeding function
seedData();
