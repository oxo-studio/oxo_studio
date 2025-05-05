import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return (
    <div className="mx-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2">
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired, // o .node se opzionale
};

export default Container;
