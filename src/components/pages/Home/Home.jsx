import React from 'react';
import {
  Link,
  Typography,
} from '@material-ui/core';
import Banner from 'components/Banner';
import NewsPost from 'components/NewsPost';
import navigation from 'constants/navigation';
import { setTitle } from 'utils/string';

const Home = () => {
  setTitle();
  return (
    <div>
      <div className="home-banners section">
        {navigation.map(navLink => <Banner {...navLink} text={navLink.name} key={navLink.path || navLink.name} />)}
      </div>
      <NewsPost
        title="Event Schedule Update"
        date="Nov 27, 2019"
      >
        <Typography>
          The Event Schedule has received a much needed update. Events are now sorted with the nearest events rising
          towards the top, but actively running events stickied to the very top.
        </Typography>
        <Typography>
          I've also added approximations for in-game events, such as the Grimghast and Crimson Rifts. It appears that
          in-game time is synced with UTC but may vary by a minute or so depending on your server.
        </Typography>
        <Typography>
          Lastly, I've added "phases" to events. For now, it's only used on Castle Siege and Crimson Rift. Castle Siege
          was broken up into the "Preparation" and "Siege" phases on EU, with only the "Claim" phase available for now
          on NA. Crimson Rift and Crimson Rift (Auroria) were combined into a single timer, with the title alternating
          to indicate whether it was taking place in the mainland or Auroria.
        </Typography>
        <Typography variant="caption" component="p">
          Library Bosses were permanently removed.<br />
          ArchePass Reset and Ayanad Trader have been temporarily disabled until their respective systems are re-enabled
          in ArcheAge Unchained.
        </Typography>
      </NewsPost>
      <NewsPost
        title="Interactive Trade Pack Calculator"
        date="Nov 22, 2019"
      >
        <Typography>
          The Interactive Trade Pack Calculator is live! There are two parts to it. The overall page will display a
          single continent's turn-in zone's prices. The percentage that every pack is displayed at can be modified
          with a slider at the top of the page.<br />
          The Commerce and Husbandry proficiencies are used in the second part of the tool...
        </Typography>
        <Typography>
          Clicking on any price on a table will open the pack inspector. From here, you will see all materials needed
          to make a pack, along with the ability to enter the price it would cost to obtain one of them.<br />
          Total gold and labor costs are calculated, and a separate demand percentage slider is available here along
          with a dropdown to select the pack's freshness profit, a toggle to include interest, and (for Cinderstone and
          Ynystere) if the +15% War bonus is active. All of this boils down into showing you the profit for this pack
          and the silver per labor of the profit.
        </Typography>
        <Typography>
          Guides for general Honor Point gain and Honor Point dailies have been added.
        </Typography>
        <Typography>
          Library bosses and Siege timers have been added to the Event Schedule for NA. Know when the EU time is?&nbsp;
          <Link href="https://www.reddit.com/message/compose/?to=mokulu">Send me a reddit PM.</Link>
        </Typography>
      </NewsPost>
      <NewsPost
        title="Guides"
        date="Nov 9, 2019"
      >
        <Typography>
          It's been a while since the last update, but that's because I've been making a bunch of guides for ArcheAge
          and there's a lot of content. This preliminary release contains guides for Hiram and Gilda dailies, world
          bosses for CR and GR as well as Meina and Glenn, and for the instances Noryette Challenge and Red Dragon's
          Keep.
        </Typography>
        <Typography>
          The Red Dragon's Keep guide may be wrong at some parts and the Noryette Challenge isn't anywhere near
          complete. It's been a while since I've done Red Dragon's Keep and I've never done the Noryette Challenge
          before playing on Unchained.
        </Typography>
        <Typography>The Event Schedule was also updated to include links to the newly created guides, as well as a few
          event time fixes.</Typography>
        <Typography>Supply Demand dailies on the checklist were reworked to better suit how they work
          in-game.</Typography>
      </NewsPost>
      <NewsPost
        title="Hide Selective Daily Quests"
        date="Oct 26, 2019"
      >
        <Typography>
          A new "Hide Mode" has been added to the Daily Checklist. Clicking the "Hide Undesired Quests" button in the
          filters panel will now put you into a "hide mode". All quests are selected by default, and unchecking a
          quest
          will hide it entirely from the normal view of the dailies checklist.<br />When you're done hiding or
          re-showing quests, just click the "Stop Hiding Quests" button to go back to the normal checklist.
        </Typography>
        <Typography>
          Event Schedule - Red Dragon's available days have been added.<br />
          Sorting issues have been fixed on Chrome for the Dailies Checklist, Event Schedule, and the Combos section
          of the Skill Builder.
        </Typography>
      </NewsPost>
      <NewsPost
        title="Thunderstruck Timer"
        date="Oct 22, 2019"
      >
        <Typography>
          The Thunderstruck tool is now available. You can start timing something of yours from scratch or time
          someone else's public tree farm by entering a remaining time. Timers will count down until each possible
          thunderstruck growth phase for the tree, based on the region's climate.
        </Typography>
        <Typography>
          I also made a few fixes for the event schedule page and added the "Clean the Kiddies" daily in Ahnimar to
          the checklist.
        </Typography>
        <Typography>
          <b>Update:</b> Event Schedule - Kadum has been added, along with Stillwater Gulf.
        </Typography>
      </NewsPost>
      <NewsPost
        title="Feedback and Updates"
        date="Oct 20, 2019"
      >
        <Typography>
          Thank you everyone for the feedback you've provided from my reddit post!
        </Typography>
        <Typography>
          - I've implemented a Dark Mode that can be toggled from the navigation menu. <br />
          - I've fixed a couple site issues. <br />
          - Auroria guild quests are now marked as Guild Missions. <br />
          - Kadum raid timer will be added at a later date, some modifications need to be added to support his odd
          availability times.
        </Typography>
        <Typography>
          As a note for the event schedule, ArcheAge Unchained's NA servers appear to use EU times for their instance
          availability times. I'll work on adding a method to select Unchained event times.
        </Typography>
        <Typography>
          I've also set up a <Link href="https://www.patreon.com/bePatron?u=12806740" target="_blank">Patreon</Link> for
          those would like to support the site. Thank you all!
        </Typography>
        <Typography>
          See an issue? Drop an email to <Link href="mailto:admin@mokulu.io">admin@mokulu.io</Link> or send a PM
          to <Link href="https://www.reddit.com/message/compose/?to=mokulu">u/Mokulu</Link>. I know my event schedule
          is not 100%
          accurate, and I'm even missing EU times.
        </Typography>
      </NewsPost>
      <NewsPost
        title="Mokulu's ArcheAge Tools"
        date=""
      >
        <Typography>
          Welcome to my ArcheAge tools site. It's currently in development and not all features are available.
        </Typography>
        <Typography>
          Check back every so often to see what's new.
        </Typography>
      </NewsPost>
    </div>
  );
};

export default Home;
