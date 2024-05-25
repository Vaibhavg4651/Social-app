import Post from "./Post";
import { POSTS } from "../../utils/db/dummy";

const Posts = () => {

	return (
		<>
			{POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{ POSTS && (
				<div>
					{POSTS.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;