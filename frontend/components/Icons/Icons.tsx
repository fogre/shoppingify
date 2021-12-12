import styled from 'styled-components';

/*Icons*/
import AddIcon from '../../assets/add.svg';
import ArrowLeft from '../../assets/arrowLeftRounded.svg';
import ArrowRightIcon from '../../assets/arrowRight.svg';
import BackArrowIcon from '../../assets/backArrow.svg';
import BottleIcon from '../../assets/source.svg';
import CalendarIcon from '../../assets/calendar.svg';
import CartIcon from '../../assets/cart.svg';
import CheckBoxCheckedIcon from '../../assets/checkbox-done.svg';
import CheckBoxIcon from '../../assets/checkbox-outline.svg';
import CloseIcon from '../../assets/close.svg';
import DeleteIcon from '../../assets/delete.svg';
import EditIcon from '../../assets/edit.svg';
import HistoryIcon from '../../assets/history.svg';
import ListIcon from '../../assets/list.svg';
import LogoIcon from '../../assets/logo.svg';
import RemoveIcon from '../../assets/remove.svg';
import SearchIcon from '../../assets/search.svg';
import StatsIcon from '../../assets/stats.svg';

interface props {
  fill?: string;
  size?: number;
  justifySelf?: string;
  children: React.ReactNode
}

const Icon = ({ fill, size, justifySelf, children }: props) => (
  <IconWrapper
    style={{
      '--fill': fill,
      '--size': `${size}px`,
      '--justify-self': justifySelf
    } as React.CSSProperties}
  >
    {children}
  </IconWrapper>  
);

const IconWrapper = styled.div`
  width: var(--size);
  height: var(--size);
  justify-self: var(--justify-self);

  svg {
    display: inline-block;
    fill: var(--fill);
    width: var(--size);
    height: var(--size);
  }
`;

export {
  AddIcon,
  ArrowLeft,
  ArrowRightIcon,
  BackArrowIcon,
  BottleIcon,
  CalendarIcon,
  CartIcon,
  CheckBoxIcon,
  CheckBoxCheckedIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  HistoryIcon,
  Icon,
  ListIcon,
  LogoIcon,
  RemoveIcon,
  SearchIcon,
  StatsIcon
};