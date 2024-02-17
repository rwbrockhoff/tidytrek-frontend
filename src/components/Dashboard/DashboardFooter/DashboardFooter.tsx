import './DashboardFooter.css';
import { Divider } from 'semantic-ui-react';

type DashboardFooterProps = {
	affiliate: boolean;
	description: string;
};

const DashboardFooter = ({ affiliate, description }: DashboardFooterProps) => {
	return (
		<footer>
			{affiliate && (
				<>
					<p className="affiliate-text">
						{description ||
							`Using the affiliate links in this pack helps support the creator of this pack
						at no extra cost to you!`}
					</p>
					<Divider />
				</>
			)}
			<a href="https://tidytrek.co" className="logo-link">
				<div className="tidytrek-tag">
					<p className="logo-text">tidytrek</p>
					<p>
						<i className="fa-solid fa-person-hiking" /> Made in Colorado
					</p>
				</div>
			</a>
		</footer>
	);
};

export default DashboardFooter;
