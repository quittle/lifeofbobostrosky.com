import fs from "fs";
import path from "path";

interface PartialGalleryEntry {
  imageName: string;
  description: string;
  date: Date;
  location?: string;
}

const PARITAL_ENTRIES: ReadonlyArray<PartialGalleryEntry> = [
  {
    imageName: "DCP00362.JPG",
    description: "Bob hard at work at Doloff Printing.",
    location: "Doloff Printing Inc.",
    date: new Date("January 11, 1997"),
  },
  {
    imageName: "DCP01109.JPG",
    description: "Bob and Joan at a work function.",
    date: new Date("5/30/1998"),
  },
  {
    imageName: "DCP01719.JPG",
    description:
      "Bob cracking crabs at the 1997 annual Doloff Printing Company Picnic.",
    location: "Doloff Printing Company Picnic",
    date: new Date("January 9, 1997"),
  },
  {
    imageName: "DCP01783.JPG",
    description:
      "Bob throwing horseshoes with his son-in-law at the 1997 annual Doloff Printing Company Picnic.",
    location: "Doloff Printing Company Picnic",
    date: new Date("January 9, 1997"),
  },
  {
    imageName: "DCP02132.JPG",
    description: "Bob holding his grandson, Bailey Doloff.",
    date: new Date("January 5, 1997"),
  },
  {
    imageName: "DSC04028.JPG",
    description:
      "Bob hanging out at the Annual Doloff Printing Company Picnic.",
    date: new Date("10/6/2002"),
  },
];

function validateEntries(
  entries: ReadonlyArray<PartialGalleryEntry>
): ReadonlyArray<PartialGalleryEntry> {
  // Validate all images used
  const fileNames = fs.readdirSync(path.join(__dirname, "images"));
  for (const fileName of fileNames) {
    if (!entries.find((entry) => entry.imageName === fileName)) {
      throw new Error(`No entries for gallery image: ${fileName}`);
    }
  }

  entries.forEach(({ description }) => {
    if (!description.endsWith(".")) {
      throw new Error(
        `Description should be a sentence ending in punctuation. Description was "${description}`
      );
    }
  });

  // Validate entries weren't copy-pasted by mistake
  for (const key of ["imageName", "description"] as ReadonlyArray<
    keyof PartialGalleryEntry
  >) {
    const uniqueValues = new Set(entries.map((entry) => entry[key]));
    if (uniqueValues.size !== entries.length) {
      throw new Error(`Non-unique entries found for ${key} in gallery entries`);
    }
  }

  // Return input to make validation easier
  return entries;
}

export interface GalleryEntry {
  imgPath: string;
  description: string;
  date: Date;
  location: string | undefined;
}

export function getGalleryEntries(): ReadonlyArray<GalleryEntry> {
  validateEntries(PARITAL_ENTRIES);
  return PARITAL_ENTRIES.map((entry) => ({
    imgPath: `/src/gallery/images/${entry.imageName}`,
    description: entry.description,
    date: entry.date,
    location: entry.location,
  }));
}
