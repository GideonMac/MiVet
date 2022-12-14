USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Inventory_Update]    Script Date: 11/23/2022 3:33:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Gideon Macapagal
-- Create date: November 16 2022
-- Description: Update record to dbo.Inventory
-- Code Reviewer: Victoria Sanchez

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Inventory_Update]
		   @ProductId int
		   ,@UserId int
		   ,@Quantity int
		   ,@IsActive bit
		   ,@BasePrice decimal(18, 2)
		   ,@Id int

AS

/*
--------- TEST CODE ----------
DECLARE @ProductId int = 33
        ,@UserId int = 75
        ,@Quantity int = 4
	,@IsActive bit = 1
	,@BasePrice decimal(18, 2) = 25.98
	,@Id int = 1

EXECUTE dbo.Inventory_Update 
		@ProductId
		,@UserId 
		,@Quantity
		,@IsActive
		,@BasePrice
		,@Id

SELECT *
FROM dbo.Inventory
WHERE Id = @Id

*/

BEGIN

DECLARE @DateNow datetime2 = GetUTCDATE();

UPDATE [dbo].[Inventory]
SET	[ProductId] = @ProductId
	,[VetId] = @UserId
	,[Quantity] = @Quantity
	,[IsActive] = @IsActive
	,[BasePrice] = @BasePrice
	,[ModifiedBy] = @UserId
	,[DateModified] = @DateNow

WHERE Id = @Id

END
GO
