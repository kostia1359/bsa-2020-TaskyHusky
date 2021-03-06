import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { Form } from 'semantic-ui-react';
import FilterPart from 'components/AdvancedSearch/FilterPart';
import MoreFilterPartsDropdown from 'components/AdvancedSearch/MoreFilters';
import { fetchFilterParts, setAddedFilterParts } from '../logic/actions';
import { FilterPartState } from '../logic/state';
import { useParams } from 'react-router';
import { getDefaultFilterParts, getAdditionalFilterParts } from '../logic/helpers';

const AdvancedFilters: React.FC = () => {
	const dispatch = useDispatch();
	const { filterParts, addedFilterParts } = useSelector((rootState: RootState) => rootState.advancedSearch);
	const isFilterDefLoading = useSelector((state: RootState) => state.filterDefs.isLoading);
	const { filterId } = useParams();

	useEffect(() => {
		if (!isFilterDefLoading) {
			dispatch(fetchFilterParts({ id: filterId }));
		}
	}, [dispatch, isFilterDefLoading, filterId]);

	const setAddedFilterPartsHandler = (addedFilterParts: FilterPartState[]) => {
		dispatch(setAddedFilterParts({ addedFilterParts }));
	};

	return (
		<div className={styles.bottomBarWrapper}>
			<Form>
				<Form.Group className={styles.searchContentContainer}>
					{getDefaultFilterParts(filterParts).map((part) => (
						<FilterPart key={part.id} filterPart={part} />
					))} 
					<MoreFilterPartsDropdown
						additionalFilterParts={getAdditionalFilterParts(filterParts)}
						addedFilterParts={addedFilterParts}
						setAddedFilterParts={(data) => setAddedFilterPartsHandler(data)}
					/>
				</Form.Group>
				<Form.Group>
					{addedFilterParts.map((part) => (
						<FilterPart key={part.id} filterPart={part} />
					))}
				</Form.Group>
			</Form>
		</div>
	);
};

export default AdvancedFilters;
