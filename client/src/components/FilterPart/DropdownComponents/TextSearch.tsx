import React, { useState } from 'react';
import { Input, Dropdown, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface DropdownTextSearchProps {
	title: string;
	searchText: string;
	data: any[];
}

const DropdownTextSearch = ({ data, title, searchText }: DropdownTextSearchProps) => {
	const [text] = useState(title);
	return (
		<Dropdown text={text} icon="angle down" floating labeled>
			<Dropdown.Menu onClick={(e: Event) => e.stopPropagation()}>
				<Input icon={null} className={styles.textSearch} />
				<Button>Save</Button>
				<Button as="a">Cancel</Button>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropdownTextSearch;