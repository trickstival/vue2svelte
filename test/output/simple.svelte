
            <script>
                // props
                export let heyProp = 'Im a prop';

                // data
                let hey = 'Im hey data';
            </script>
            
            <h1>
                
                {#if heyProp === 'ai'}
                    
                <span >
                    sup {heyProp}
                </span>
            
                {/if}
            
 plp {heyProp} {hey}
            </h1>
        
        