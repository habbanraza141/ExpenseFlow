import {useAppSelector} from './useAppSelector';
import {lightTheme, darkTheme} from '../constants/colors';

export const useTheme = () => {
  const mode = useAppSelector(state => state.theme.mode);
  const colors = mode === 'dark' ? darkTheme : lightTheme;
  return {mode, colors};
};
