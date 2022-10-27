import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import {CreateNewCollection} from './CreateNew';

export function AddCollection() {
	const [opened, setOpened] = useState(false);
	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title={"title"}
			>
				<CreateNewCollection/>
			</Modal>

			<Group position="center">
				<Button onClick={() => setOpened(true)}>Create new Collection</Button>
			</Group>
		</>
	);
}