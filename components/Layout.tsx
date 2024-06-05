/**
 * A grid wraps a list of children and automatically layouts them into a grid.
 * @example
 * <Grid>
 *   <div></div>
 *   <div></div>
 *   ....
 * </Grid>
 * @param props 
 * @returns 
 */
export const Grid = (props: any) => {
    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4'>
            {props.children}
        </div>
    );
}