
            <script>
                // props
                export let heyProp = 'Im a prop';

                // data
                let hey = 'Im hey data';
            </script>
            
            <h1>
                
                {#if heyProp === 'ai'}
                    
                <span >
                    eai {heyProp}
                </span>
            
                {/if}
            
 galera {heyProp} {hey}
            </h1>
        
        