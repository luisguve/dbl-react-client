import ContainerQuery from "./Query/Container";
import ContainerReview from "./Review/Container";
import ContainerSamples from "./Samples/Container";
import ContainerDefects from "./Defects/Container";
import ContainerComments from "./Comments/Container";
import ContainerReviewForm from './ReviewForm/Container';
import ContainerFeatures from "./Features/Container";

const Home = () => {
	return (
		<ContainerQuery />
		<ContainerReview />
		<ContainerSamples />
		<ContainerDefects />
		<ContainerComments />
		<ContainerFeatures />
		<ContainerReviewForm />
	);
}

export default Home;