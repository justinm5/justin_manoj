import { Link } from "react-router";
import { SiteLayout } from "@/components/SiteLayout";

const NotFound = () => (
  <SiteLayout>
    <h1 className="home-name">404</h1>
    <div className="home-intro">
      <p>
        That page does not exist. <Link to="/">Head back home</Link>.
      </p>
    </div>
  </SiteLayout>
);

export default NotFound;
