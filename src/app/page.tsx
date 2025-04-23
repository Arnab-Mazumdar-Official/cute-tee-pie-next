import AnnouncementBar from '../../components/anouncement/announcement';
import Header from '../../components/header/header';
import BannerSection from '../../components/firstbanner/firstbanner';

async function Page() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <BannerSection />
    </>
  );
}

export default Page;