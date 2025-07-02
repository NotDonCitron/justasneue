import { FC, ReactNode } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/justas-animations.css';

interface PageTransitionProps {
  children: ReactNode;
  location: string;
}

export const PageTransition: FC<PageTransitionProps> = ({ 
  children, 
  location 
}) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={location}
        classNames="page-transition"
        timeout={300}
      >
        <div>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}; 