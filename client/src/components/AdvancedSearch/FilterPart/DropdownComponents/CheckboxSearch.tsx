import React, { useState } from 'react';
import { Input, Dropdown, Checkbox, Icon, Label, InputOnChangeData, DropdownItemProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { FilterPartState } from 'containers/AdvancedSearch/logic/state';
import { updateFilterPart } from 'containers/AdvancedSearch/logic/actions';
import { useDispatch } from 'react-redux';
import { DropdownOption } from '../types';
import { useTranslation } from 'react-i18next';

interface DropdownSearchProps {
	filterPart: FilterPartState;
	data: DropdownOption[];
}

const DropdownSearch = ({ filterPart, data }: DropdownSearchProps) => {
	const dispatch = useDispatch();
	const { filterDef, members } = filterPart;
	const { title } = filterDef;
	const [selection, setSelection] = useState<string[]>(members);
	const [searchText, setSearchText] = useState('');
	const { t } = useTranslation();

	const toggleSelection = (e: React.SyntheticEvent, { value: checkedValue }: DropdownItemProps) => {
		const value = checkedValue as string;
		if (isSelected(value as string)) {
			const updated = selection.filter((el) => el !== value);
			setSelection(updated);
			filterPart.members = updated;
		} else {
			const updated = [...selection, value];
			setSelection(updated);
			filterPart.members = updated;
		}
		toggleUpdateFilterPart();
	};

	const toggleUpdateFilterPart = () => {
		dispatch(updateFilterPart({ filterPart }));
	};

	const isSelected = (valueId: string) => {
		const filterPart = selection.find((id) => id === valueId);
		return Boolean(filterPart);
	};

	const LabelC = (option: DropdownOption) => {
		const { icon, color, text, key } = option;
		return (
			<label>
				{!!icon && <Icon color={color as 'red'} key={`icon-${key}`} name={icon as 'folder'} />}
				{color ? (
					<Label key={`label-${key}`} horizontal color={color as 'red'}>
						{text}
					</Label>
				) : (
					text
				)}
			</label>
		);
	};

	const getInputPlaceholder = (title: string) => {
		return `${t('find_by')} ${t(title)}`;
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
		const { value } = data;
		setSearchText(value);
	};

	const searchString = new RegExp(searchText, 'i');
	const filteredData = data.filter(({ text }) => searchString.test(text));

	const getTitle = () => {
		if (selection.length > 0) {
			return data
				.filter(({ value }) => selection.some((el) => el === value))
				.slice(0, 3)
				.map(({ text }, index) => (index === 2 ? '...' : text))
				.join(', ');
		} else {
			return t(title);
		}
	};

	return (
		<Dropdown
			multiple
			className={styles.dropdown}
			trigger={<span>{getTitle()}</span>}
			icon="angle down"
			floating
			labeled
		>
			<Dropdown.Menu className={styles.dropdownMenu} onClick={(e: Event) => e.stopPropagation()}>
				<Input
					placeholder={getInputPlaceholder(filterDef.title)}
					icon="search"
					value={searchText}
					iconPosition="left"
					className={styles.searchInput}
					onChange={handleSearchChange}
				/>
				<Dropdown.Divider />
				<Dropdown.Header icon="folder open" content={t(title)} />
				<Dropdown.Menu scrolling>
					{filteredData.map((option) => (
						<Dropdown.Item value={option.value} key={option.key} onClick={toggleSelection}>
							<Checkbox
								onChange={undefined}
								onClick={undefined}
								onMouseDown={undefined}
								onMouseUp={undefined}
								readOnly
								label={LabelC(option)}
								checked={isSelected(option.value)}
							/>
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropdownSearch;
