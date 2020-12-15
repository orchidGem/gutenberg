/**
 * WordPress dependencies
 */
import { useCallback, useRef, useEffect } from '@wordpress/element';
import { focus } from '@wordpress/dom';

/**
 * Hook used to focus the first tabbable element on mount.
 *
 * @param {boolean|string} focusOnMount Focus on mount mode.
 * @return {Function} Ref callback.
 *
 * @example
 * ```js
 * import { useFocusOnMount } from '@wordpress/compose';
 *
 * const WithFocusOnMount = () => {
 *     const ref = useFocusOnMount()
 *     return (
 *         <div ref={ ref }>
 *             <Button />
 *             <Button />
 *         </div>
 *     );
 * }
 * ```
 */
export default function useFocusOnMount( focusOnMount ) {
	const didMount = useRef( false );
	const focusOnMountRef = useRef( focusOnMount );
	useEffect( () => {
		focusOnMountRef.current = focusOnMount;
	}, [ focusOnMount ] );
	return useCallback( ( node ) => {
		if (
			! node ||
			didMount.current === true ||
			focusOnMountRef.current === false
		) {
			return;
		}

		didMount.current = true;

		if ( node.contains( node.ownerDocument.activeElement ) ) {
			return;
		}

		let target = node;

		if ( focusOnMountRef.current === 'firstElement' ) {
			const firstTabbable = focus.tabbable.find( node )[ 0 ];

			if ( firstTabbable ) {
				target = firstTabbable;
			}
		}

		target.focus();
	}, [] );
}
