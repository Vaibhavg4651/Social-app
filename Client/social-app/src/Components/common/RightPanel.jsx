import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { setusers } from "../../Reducers/userSlice";
import URL from "../../ConfigUrl/config";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import { useSelector, useDispatch } from "react-redux";

const RightPanel = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			try {
			  const response = await axios.get(`${URL}/users`);
			  dispatch(setusers(response.data.message));
			} catch (error) {
			  setError(error);
			} 
		  };
		  fetchData();
		}
		, []);
		
		const users = useSelector((state) => state.user.users);

	return (
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					
					{
						users.map((user) => (
							<Link
								to={`/profile/${user._id}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.user_photo_url || "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{user.name}
										</span>
										<span className='text-sm text-slate-500'>@{user.user_name}</span>
									</div>
								</div>
								<div>
									<button
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
										onClick={(e) => e.preventDefault()}
									>
										Follow
									</button>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};
export default RightPanel;