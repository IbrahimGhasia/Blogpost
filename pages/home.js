import { Layout } from '../components/Layout';
import { Box, Center, SimpleGrid } from '@mantine/core';
import { ArticleCard } from '../components/ArticleCard';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Post from '../components/Post';

export default function Home() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetchPost();
	}, []);

	const fetchPost = async () => {
		const postData = await fetch(
			'https://testnet.tableland.network/query?s=SELECT%20*%20FROM%20_postTable_80001_3858'
		);
		const postDataJSON = await postData.json();
		console.log('Post Data JSON', postDataJSON);
		setPosts(postDataJSON);
		// const posts = postDataJSON.map((item) => <li>{item}</li>);
	};

	return (
		<div>
			<Layout>
				<Box sx={{ maxWidth: 600 }} mx='auto' mt='3%'>
					<Center>
						<h1>Welcome to Blogpost</h1>
					</Center>

					<Post posts={posts} />
				</Box>
			</Layout>
		</div>
	);
}
