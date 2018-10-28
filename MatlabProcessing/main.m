clear;
clc;

tic

% Read the data
[num, txt, raw] = xlsread('data/combined.csv');

SOLAR_POWER = 1056; % In Watts per meter^2

% For every solar panel
for i = 1:length(raw)
    % Get the data
    height   = cell2mat(raw(i, 1));
    width    = cell2mat(raw(i, 2));
    eff      = cell2mat(raw(i, 5));

    % Swap width and height if width > height
    if(width > height)
        height   = cell2mat(raw(i, 2));
        width    = cell2mat(raw(i, 1));
    end
    
    % Make sure our numbers are numeric, if not then set to 0
    if isnumeric(height) == 0 || isnan(height) == 1
       height = 0; 
    end
    if isnumeric(width) == 0 || isnan(width) == 1
       width = 0; 
    end
    if isnumeric(eff) == 0 || isnan(eff) == 1
       eff = 0; 
    end
    
    % Given in assignment constraint:
    % We can have 2 panels that are smaller than 1.2m by 1.2m
    % Or we can have 3 panels that are smaller than 1.2m by 0.8m
    numOfPanelsToHave = 0;
    if(height < 1200)
        if(width < 800)
            numOfPanelsToHave = 3;
        elseif(width < 1200)
            numOfPanelsToHave = 2;
        else
            numOfPanelsToHave = 0;
        end
    end
    % Get area of one panel
    areaOfOnePanel = height * width;
    % Total area with number of panels
    areaTotal = areaOfOnePanel * numOfPanelsToHave;
    
    % Power = Area * Incoming power * Efficiency
    % /1000000 is to convert from mm^2 to m^2
    totalPowerFromPanel = areaTotal * SOLAR_POWER * (eff/100) / 1000000;
    
    % Add in a new column for power produced by solar panel
    raw(i, 10) = {totalPowerFromPanel};
end

disp('Finished processing. Saving file...');


% Sort the output by descending order to find the best performing solar
% panels
sortedProcessed = sortrows(raw, 10, 'descend');

headings = {'Height', 'Width', 'Thickness', 'Efficiency','Cleaned Efficiency', 'Model', 'N/A', 'N/A', 'N/A', 'Power output'};

sortedProcessedHeading = [headings; sortedProcessed];

cell2csv('BestSolarPanels.csv',sortedProcessedHeading)

% dlmwrite(, num2cell(sortedProcessed));

toc