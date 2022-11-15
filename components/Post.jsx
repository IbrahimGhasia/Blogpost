import { Text, SimpleGrid } from '@mantine/core';
import { ArticleCard } from './ArticleCard';

const Post = ({ posts }) => {
	return (
		<div>
			<SimpleGrid cols={1} spacing='xs' verticalSpacing='xl'>
				{posts.map((post) => (
					<ArticleCard key={post.postID} post={post} />
				))}
			</SimpleGrid>
		</div>
	);
};

export default Post;
