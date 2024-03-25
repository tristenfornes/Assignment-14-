document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/crafts')
        .then(response => response.json())
        .then(crafts => {
            const gallery = document.getElementById('gallery');
            crafts.forEach(craft => {
                const craftElement = createCraftElement(craft);
                gallery.appendChild(craftElement);
            });
        })
        .catch(error => console.error('Error fetching crafts:', error));
});

function createCraftElement(craft) {
    const craftElement = document.createElement('div');
    craftElement.classList.add('craft');

    const image = document.createElement('img');
    image.src = craft.image;
    image.alt = craft.name;
    craftElement.appendChild(image);

    const name = document.createElement('h2');
    name.textContent = craft.name;
    craftElement.appendChild(name);

    const description = document.createElement('p');
    description.textContent = craft.description;
    craftElement.appendChild(description);

    const suppliesTitle = document.createElement('h3');
    suppliesTitle.textContent = 'Supplies:';
    craftElement.appendChild(suppliesTitle);

    const suppliesList = document.createElement('ul');
    craft.supplies.forEach(supply => {
        const supplyItem = document.createElement('li');
        supplyItem.textContent = supply;
        suppliesList.appendChild(supplyItem);
    });
    craftElement.appendChild(suppliesList);

    craftElement.addEventListener('click', () => {
        showModal(craft);
    });

    return craftElement;
}

function showModal(craft) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    const modalHeader = document.createElement('h2');
    modalHeader.textContent = craft.name;

    const modalDescription = document.createElement('p');
    modalDescription.textContent = craft.description;

    const modalSuppliesTitle = document.createElement('h3');
    modalSuppliesTitle.textContent = 'Supplies:';

    const modalSuppliesList = document.createElement('ul');
    craft.supplies.forEach(supply => {
        const supplyItem = document.createElement('li');
        supplyItem.textContent = supply;
        modalSuppliesList.appendChild(supplyItem);
    });

    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalDescription);
    modalContent.appendChild(modalSuppliesTitle);
    modalContent.appendChild(modalSuppliesList);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
