import Post from "./Post";
// import { POSTS } from "../../utils/db/dummy";
import URL  from "../../ConfigUrl/config";
import { useEffect } from "react";
import { setPosts } from "../../Reducers/userSlice";
import axios from "axios";
import { useDispatch , useSelector } from "react-redux";

const Posts = () => {
	const dispatch = useDispatch();
	const POSTS = useSelector((state) => state.user.posts);
	useEffect(() => {
		const fetchData = async () => {
			try {
			  const response = await axios.get(`${URL}/posts`);
			  dispatch(setPosts(response.data));
			} catch (error) {
			  setError(error);
			} 
		  };
		  fetchData();
	}
	, []);

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