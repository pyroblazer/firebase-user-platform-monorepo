import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../rootReducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;