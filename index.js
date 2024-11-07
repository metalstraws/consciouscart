import pkg from 'openfoodfacts-nodejs';
const { OpenFoodFacts } = pkg;

const client = new OpenFoodFacts();

async function getProductInfo() {
    try {
        const product = await client.getProduct("5010251759799");
        
        // Extract key details
        const summary = {
            name: product.product_name,
            brand: product.brands,
            quantity: product.quantity,
            
            // Health metrics
            nutriScore: product.nutriscore_grade?.toUpperCase() || 'Unknown',
            novaGroup: product.nova_group || 'Unknown', // 1-4 scale of processing
            
            // Ingredients summary
            ingredients: product.ingredients_text,
            allergens: product.allergens_tags,
            
            // Nutrition per 100g/ml
            nutrition: {
                energy: `${product.nutriments.energy_100g} ${product.nutriments.energy_unit}`,
                sugars: `${product.nutriments.sugars_100g}g`,
                fat: `${product.nutriments.fat_100g}g`,
                salt: `${product.nutriments.salt_100g}g`,
                caffeine: `${product.nutriments.caffeine_100g}g`
            },
            
            // Environmental impact
            packaging: product.packaging_text,
            ecoScore: product.ecoscore_grade || 'Unknown'
        };

        // Pretty print the summary
        console.log('=== Product Summary ===');
        console.log(`Name: ${summary.name}`);
        console.log(`Brand: ${summary.brand}`);
        console.log(`Size: ${summary.quantity}`);
        console.log('\n=== Health ===');
        console.log(`Nutri-Score: ${summary.nutriScore}`);
        console.log(`Processing Level (NOVA): ${summary.novaGroup}`);
        console.log('\n=== Ingredients ===');
        console.log(summary.ingredients);
        console.log('\n=== Nutrition per 100ml ===');
        Object.entries(summary.nutrition).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
        console.log('\n=== Environmental Impact ===');
        console.log(`Packaging: ${summary.packaging}`);
        console.log(`Eco-Score: ${summary.ecoScore}`);

        return summary;
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

getProductInfo();