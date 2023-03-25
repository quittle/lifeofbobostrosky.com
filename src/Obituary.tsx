import React from "react";
import sections from "./sections";

// eslint-disable-next-line max-lines-per-function
export default function Obituary(_props: Record<string, never>) {
  return (
    <section id={sections.obituary.id}>
      <h2>{sections.obituary.label}</h2>
      <p>
        Robert Ostrosky, known by his friends as “Bob,” passed away peacefully,
        surrounded by his family, at his home in Clarksville, MD on{" "}
        <time>April 3, 2022</time>, at the age of 93. He was a medical miracle,
        having survived for many decades after multiple cancers, strokes and
        renal failure. Bob ultimately succumbed to cancer that had metastasized
        to his brain.
      </p>
      <p>
        Bob was born on <time>February 15, 1929</time> to Frank “Trink” and
        Julianna “Julie” Kusz Ostrosky in the small coal mining town of Windber,
        PA. He holds the distinction of being the first in his family to be born
        in a hospital. He was the baby of 11 children and was predeceased by all
        – John Ostrosky, Kathryn “Kay” Ostrosky Skolnick, Mary Ostrosky Tirello,
        Ann Ostrosky Geibel, Rose Ostrosky Bernhardt, Michael Ostrosky, Joan
        Ostrosky Hmay, Nick Frank Ostrosky and Stephen Ostrosky who passed
        shortly after birth.
      </p>
      <p>
        Bob loved to work and loved to work hard, from the time he was 11, he
        held a job every summer of his childhood. In 1940 and 1941, he had his
        first job watching cows from dawn until dusk 7 days a week for $2.50
        month. At 13, he was setting pins at a bowling alley and then at 14, he
        worked at a car dealership polishing cars for $0.16 hr. At 15, he lied
        about his age so that he could get his Social Security Card and a job
        working on the railroad. He didn’t get the job and instead, went to work
        for a road paver shoveling and hand tamping gravel making $0.40 hr. All
        throughout these years, his side hussle was digging gardens for his
        mom’s friends for $0.10 an hour.
      </p>
      <p>
        At 17, after graduating from Windber Joint High School in 1946, he moved
        to Washington, DC and went to work for 2 years at Accacia making $ 0.75
        hr. as a press operator in the days of lead type and with a dress code
        requiring that he wear a white shirt and tie. When he would tell the
        story, he would always let us know that he wasn’t well dressed enough to
        be a messenger. In 1948 he moved to The World Bank for $ 1.25 hr., also
        as a press operator, until 1951 when he was drafted into the army for
        the Korean War. Bob served as a Private stationed in Germany until 1953,
        working as a Radio Operator/Remote Teletype Operator making $1.05 hr.
        Bob then served for 5 years in the Army Reserves, during which time he
        went back to work for The World Bank and studied at Benjamin Franklin
        University and George Washington University. In 1956 he received a
        Bachelor of Commercial Science and then in 1957 a Master of the same
        from Benjamin Franklin University.
      </p>
      <p>
        Shortly after starting back at The World Bank, he went to work for Batt
        Bates, doubling his salary to $2.50 hr., first as a Pressman/Assistant
        Pressroom Supervisor, then eventually becoming the Pressroom Supervisor.
        After 12 years, he went on to work as General Manager and eventually VP
        and part owner of Expedite/Presstar where he stayed until 1991 when he
        helped found and run Doloff Printing. He always had a knack for numbers
        which made him a great estimator. Bob was well-loved and respected by
        his peers, customers and employees alike.
      </p>
      <p>
        He was very active at PGAMA when it was known as PIW, PIMW, and
        P&amp;GCA, serving on the board for over 3 decades. Highlights include
        being President of the Master Printers Division from 1985-1986 and
        Master Printer of the Year in 1988.
      </p>
      <p>
        In 1950, he met Joan Winslow and they married in 1955, going on to have
        3 children, Tamara Ostrosky Doloff, Robert Merrill Ostrosky and Ladimer
        Frank Ostrosky. He is survived by all plus 2 grandsons, Dustin Robert
        (Doloff) Toff and Bailey Austin Doloff. Bob deeply loved his family; his
        children and grandsons all felt that they hit the lottery to have him as
        a father and grandfather. Not only was he kind with a dry sense of
        humor, but he was generous, humble, and wise, giving timeless advice
        that will be carried with them for the rest of their lives.
      </p>
      <p>
        Throughout his life, Bob traveled the country and the world and was very
        much involved with his community. He loved golf, gardening, ice skating,
        cards and games and puzzles, ballroom dancing and horseback riding. He
        loved to entertain and throw large parties. He was an avid reader of
        everything and closely followed the politics of the day. He loved
        history. He played the guitar and was an incredible artist, focusing on
        oil painting, pencil, wood working and was an on-the-spot inventor of
        many things. He’s famous for designing and drawing his own Christmas
        Cards and Announcements. He always said, that if he had another life to
        live, he would be an astronomer.
      </p>
      <p>
        After retiring in 2008 at the age of 79, Bob spent much of his time
        gardening and working on and around the house in which he and his wife
        took great pride, as they had 100% designed and built it themselves,
        before moving there in 1976. Additionally, he continued to enjoy golf,
        politics and spending time with family and friends.
      </p>
      <p>
        A celebration of life will be held for him <time>May 7th, 2023</time>.
        To attend, please{" "}
        <a href={sections.plans.link}>
          <b>RSVP here</b>
        </a>
        .
      </p>
      <p>
        If you wish to donate in his name, you may do so at{" "}
        <a href="https://t2t.org/donate" rel="noreferrer" target="_blank">
          Tunnels to Towers Foundation
        </a>
        , the{" "}
        <a
          href="https://donate.fisherhouse.org"
          rel="noreferrer"
          target="_blank"
        >
          Fisher House Foundation
        </a>
        , or{" "}
        <a
          href="https://www.stjude.org/donate"
          rel="noreferrer"
          target="_blank"
        >
          St. Jude Hospital
        </a>
        .
      </p>
    </section>
  );
}
