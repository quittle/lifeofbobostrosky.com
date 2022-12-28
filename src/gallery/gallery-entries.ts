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
    description: 'Bob laying film "stripping".',
    location: "Doloff Printing Inc.",
    date: new Date("January 11, 1997"),
  },
  {
    imageName: "DCP01109.JPG",
    description: "Bob and Joan at a work function.",
    location: "Master Printers Awards Ceremony",
    date: new Date("5/30/1998"),
  },
  {
    imageName: "DCP01719.JPG",
    description:
      "Bob cracking crabs at the 1998 annual Doloff Printing Company Picnic.",
    location: "Doloff Printing Company Picnic",
    date: new Date("September, 1998"),
  },
  {
    imageName: "DCP01783.JPG",
    description:
      "Bob throwing horseshoes with his son-in-law at the 1998 annual Doloff Printing Company Picnic.",
    location: "Doloff Printing Company Picnic",
    date: new Date("September, 1998"),
  },
  {
    imageName: "DCP02132.JPG",
    description: "Joan with Bob, holding his grandson, Bailey Doloff.",
    date: new Date("January 5, 1997"),
  },
  {
    imageName: "DSC04028.JPG",
    description:
      "Bob hanging out at the Annual Doloff Printing Company Picnic.",
    date: new Date("10/6/2002"),
  },
  {
    imageName: "8a4152b1-7bd2-47d1-b0dc-c18ac8eb35af.jpg",
    description: "Bob and Joan in front of the house he grew up in.",
    date: new Date("2013-01-29"),
    location: "Windber, PA",
  },
  {
    imageName: "c1bd286d-b59e-4fe3-9309-80607b5a502d.jpg",
    description: "Bob showing his family around the house he grew up in.",
    date: new Date("2013-01-29"),
    location: "Windber, PA",
  },
  {
    imageName: "BobOstrosky2.jpg",
    description:
      "Bob with Ridgehaven Irish “Style” as a 2 year old. Tamara’s 1st horse.",
    date: new Date("1977"),
  },
  {
    imageName: "cloisters-castle-maryland-wedding-luma-weddings-398.jpg",
    description: "Liz and Dustin's Wedding.",
    location: "Cloisters Castle, MD",
    date: new Date("2017-09-30"),
  },
  {
    imageName: "286.jpg",
    description:
      "Bob O, Joan, Lad, Tamara, Robert, Bob D, Michael, Lotte, and Leo at Tamara's wedding.",
    location: "Clarksville, MD",
    date: new Date("1991-04-28"),
  },
  {
    imageName: "12.jpg",
    description: "Bob making a toast at his daughter's wedding.",
    location: "Clarksville, MD",
    date: new Date("1991-04-28"),
  },
  {
    imageName: "13.jpg",
    description: "Bob hugging Tamara on her wedding day.",
    location: "Clarksville, MD",
    date: new Date("1991-04-28"),
  },
  {
    imageName: "IMG_5358.JPG",
    description: "Bob at the 2006 Doloff Printing company picnic.",
    location: "Doloff Printing Company Picnic",
    date: new Date("2006"),
  },
  {
    imageName: "img257.jpg",
    description: "Wedding portrait of Bob and Joan.",
    date: new Date("1955-12-2"),
  },
  {
    imageName: "IMG_8479.JPG",
    description: "Bob giving his family a tour of the house he grew up in.",
    location: "Windber, PA",
    date: new Date("2012-02-08"),
  },
  {
    imageName: "IMG_8475.JPG",
    description: "Bob outside the house he grew up in.",
    location: "Windber, PA",
    date: new Date("2012-02-08"),
  },
  {
    imageName: "IMG_8461.JPG",
    description: "Bob and his family visiting the house he grew up in.",
    location: "Windber, PA",
    date: new Date("2012-02-08"),
  },
  {
    imageName: "IMG_6333.JPG",
    description: "Bob with his family on Mother's Day.",
    location: "Clarksville, MD",
    date: new Date("2011-05-08"),
  },
  {
    imageName: "DCP00120.JPG",
    description: "Bob on a call at Doloff Printing.",
    location: "Doloff Printing Inc.",
    date: new Date("October 1998"),
  },
  {
    imageName: "IMG_0854.JPG",
    description: "Bob and Joan on Father's Day 2012.",
    location: "Manor Country Club",
    date: new Date("2012-06-17"),
  },
  {
    imageName: "IMG_0842.JPG",
    description: "Bob and Robert on Father's Day 2012.",
    location: "Manor Country Club",
    date: new Date("2012-06-17"),
  },
  {
    imageName: "IMG_0843.JPG",
    description: "Bob and Tamara on Father's Day 2012.",
    location: "Manor Country Club",
    date: new Date("2012-06-17"),
  },
  {
    imageName: "IMG_0858.JPG",
    description:
      'Bob enjoying a slice of birthday cake at the annual "Bob"s birthday party.',
    date: new Date("March 2014"),
  },
  {
    imageName: "IMG_2520.JPG",
    description:
      "Michael, Bob D, Lotte, Dustin, Joan, Robert, Tamara, Bailey, and Bob celebrating Dustin's high school graduation.",
    location: "The Kings Contrivance",
    date: new Date("2009-06-12"),
  },
  {
    imageName: "IMG_3206.JPG",
    description: "Bob O with his son-in-law Bob D.",
    location: "Clarksville, MD",
    date: new Date("2010-01-03"),
  },
  {
    imageName: "IMG_3976.JPG",
    description: "Bob and Joan hanging out with their son Ladimer.",
    location: "Clarksville, MD",
    date: new Date("2010-06-27"),
  },
  {
    imageName: "IMG_3969.JPG",
    description: "Bob measuring the height of his grandson Dustin.",
    location: "Clarksville, MD",
    date: new Date("2010-06-27"),
  },
  {
    imageName: "IMG_3970.JPG",
    description: "Bob measuring the height of his grandson Bailey.",
    location: "Clarksville, MD",
    date: new Date("2010-06-27"),
  },
  {
    imageName: "IMG_6564.JPG",
    description: "Bob on Father's Day 2011.",
    location: "Clarksville, MD",
    date: new Date("2011-06-19"),
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
